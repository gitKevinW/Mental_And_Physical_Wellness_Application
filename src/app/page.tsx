import Image from "next/image";
import Link from 'next/link';
import SignInComp from "./_components/SignInComp";

export default function SignIn() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <SignInComp />
    </div>
  );
}