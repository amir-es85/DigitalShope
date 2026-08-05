import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {

  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import LoginForm from './../../../components/auth/login-form';
import RegisterForm from './../../../components/auth/register-form';

export default function AuthPage(){
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
  <Card className="w-[400px]">
    <CardHeader>
      <CardTitle>Authentication</CardTitle>
    </CardHeader>

    <CardContent>
      <Tabs defaultValue="login">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="login">
            Login
          </TabsTrigger>

          <TabsTrigger value="register">
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm /> 
        </TabsContent>

        <TabsContent value="register">
        <RegisterForm />
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</div>
  )
}