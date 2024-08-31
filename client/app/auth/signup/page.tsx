export default function SignUp() {
    return (
        <div className="flex w-full justify-center items-center py-[15rem] ">
            <div className="flex flex-col">
                <h1 className="font-semibold text-center mb-12 text-3xl ">
                    Create your account
                </h1>
                <form action="">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm text-[#444444]">
                            Email:
                        </label>
                        <input
                            type="text"
                            name=""
                            id=""
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#f2e817]"
                            placeholder="john@email.com"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        <label htmlFor="" className="text-sm text-[#444444]">
                            Password
                        </label>
                        <input
                            type="text"
                            name=""
                            id=""
                            className="bg-[#f8f8f8] h-[2.4rem] rounded-[.5rem] pl-4 focus:outline-none focus:ring-2 focus:ring-[#f2e817]"
                            placeholder="********"
                        />
                    </div>
                    <div>
                        <button style={{ color: 'white' }} className="bg-gradient-to-r from-[#ff8d09] to-[#f2e817] h-[2.4rem] w-full text-sm rounded-[.5rem] font-semibold uppercase mt-6 ">
                            Sign Up
                        </button>
                        <h2 className="mt-3 text-center">
                            Have an account?
                            <span className="text-[#f2e817] ml-2">SIGN UP</span>
                        </h2>
                    </div>
                </form>
            </div>
        </div>
    );
}
