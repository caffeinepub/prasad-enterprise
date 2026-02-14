import React, { useEffect, useState } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useActor } from '../../hooks/useActor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, Loader2 } from 'lucide-react';
import LoginButton from './LoginButton';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      if (!actor || actorFetching || isInitializing) {
        return;
      }

      if (!identity) {
        setIsAdmin(false);
        setChecking(false);
        return;
      }

      try {
        const adminStatus = await actor.isCallerAdmin();
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    }

    checkAdmin();
  }, [actor, actorFetching, identity, isInitializing]);

  if (isInitializing || actorFetching || checking) {
    return (
      <div className="container max-w-2xl py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="container max-w-2xl py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Authentication Required
            </CardTitle>
            <CardDescription>
              You must be logged in to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container max-w-2xl py-12">
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertDescription>
            Access Denied: You do not have permission to access this page. Only administrators can manage blog posts.
          </AlertDescription>
        </Alert>
        <div className="mt-6">
          <LoginButton />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
