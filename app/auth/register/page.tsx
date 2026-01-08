import RegisterForm from "../../components/RegisterForm";
import { Suspense } from 'react';


export default function Register() {
    return (
        <div className="min-h-screen bg-gray-100 pb-20 flex flex-col">

            <div className="bg-[#0F766E] h-24"/>

            <div className="max-w-md mx-auto flex justify-center mt-10 px-4 rounded-xl">
                <div className="bg-white shadow-lg rounded-2xl p-6 mt-8 w-full max-w-sm">
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                        Créer un compte
                    </h2>


                    <Suspense
                        fallback={
                            <div className="max-w-md mx-auto flex justify-center mt-10 px-4">
                                <div className="bg-white shadow-lg rounded-2xl p-6 mt-8 w-full max-w-sm">
                                    <div className="animate-pulse bg-gray-200 h-8 w-32 mb-8 mx-auto rounded"></div>
                                    <div className="space-y-4">
                                        <div className="h-12 bg-gray-200 rounded"></div>
                                        <div className="h-12 bg-gray-200 rounded"></div>
                                        <div className="h-12 bg-gray-200 rounded"></div>
                                        <div className="h-12 bg-gray-200 rounded"></div>
                                        <div className="h-12 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <RegisterForm />
                    </Suspense>

                    <div className="mt-4 text-center text-sm">
                        <span className='text-[#014d74] hover:text-[#013d5a]'>Vous avez déjà un compte ?{" "}</span>
                        <a href="/" className="text-[#014d74] font-medium hover:underline">
                            Se connecter
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
