import React from 'react';
import { useRouteError, useNavigate, Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <main className="py-16 min-h-[80vh] flex items-center justify-center">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 w-full">
                <section className="rounded-[40px] bg-white p-8 shadow-lg sm:p-12 text-center">
                    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
                        {/* Error Icon */}
                        <div className="mb-8 relative">
                            <div className="w-32 h-32 rounded-full bg-[#eef5f4] flex items-center justify-center">
                                <AlertCircle className="w-16 h-16 text-[#0f5a4d]" strokeWidth={1.5} />
                            </div>
                            <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-[#c4f243] flex items-center justify-center text-3xl font-bold text-[#06241f]">
                                !
                            </div>
                        </div>

                        {/* Error Code */}
                        <div className="mb-6">
                            <h1 className="text-8xl font-extrabold text-[#0f5a4d] mb-4">
                                {error?.status || '404'}
                            </h1>
                            <h2 className="text-4xl font-semibold text-[#0b322d] mb-4">
                                {error?.status === 404 ? 'Page Not Found' : 'Oops! Something went wrong'}
                            </h2>
                        </div>

                        {/* Error Message */}
                        <div className="mb-10">
                            <p className="text-lg text-[#4a5d5b] mb-4">
                                {error?.status === 404 
                                    ? "The page you're looking for seems to have been lost in transit. Don't worry, we'll help you get back on track!"
                                    : error?.statusText || error?.message || "An unexpected error occurred. Our team has been notified and is working to fix it."
                                }
                            </p>
                            {error?.status !== 404 && error?.data && (
                                <p className="text-sm text-[#4f6260] mt-2">
                                    {error.data}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center gap-2 rounded-full border border-[#8ecdc1] px-8 py-4 text-base font-semibold text-[#0d3f34] transition hover:bg-[#eef4f3] hover:border-[#0f5a4d]"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Go Back
                            </button>
                            <Link
                                to="/"
                                className="flex items-center justify-center gap-2 rounded-full bg-[#c4f243] px-8 py-4 text-base font-semibold text-[#06241f] shadow hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg transition"
                            >
                                <Home className="w-5 h-5" />
                                Go Home
                            </Link>
                        </div>

                        {/* Additional Help Section */}
                        <div className="mt-12 pt-8 border-t border-[#8ecdc1] w-full">
                            <p className="text-sm text-[#4f6260] mb-4">
                                Need help? Contact our support team
                            </p>
                            <Link
                                to="/contactus"
                                className="inline-block text-[#0f5a4d] font-semibold hover:text-[#0b322d] transition underline"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Fun Illustration Section */}
                <section className="mt-8 rounded-[40px] bg-[#032f35] px-6 py-8 text-white shadow-lg">
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-[0.35em] text-[#94ffd6] mb-2">
                            Lost Parcel?
                        </p>
                        <p className="text-lg text-[#daefe9]">
                            Just like a misplaced package, sometimes pages get lost. But don't worry, we'll help you find your way back!
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ErrorPage;