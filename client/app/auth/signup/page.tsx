export default function SignUp() {
    return (
        <div className="flex w-full justify-center items-center min-h-screen">
            <div className="flex flex-col">
                <h1 className="font-semibold text-center">Create your account</h1>
                <form action="">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm text-[#444444]">Email:</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            className="bg-[#f8f8f8]"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="text-sm text-[#444444]">Password</label>
                        <input
                            type="text"
                            name=""
                            id=""
                            className="bg-[#f8f8f8]"
                        />
                    </div>
                    <div>
                    <button className="bg-gradient-to-r from-[#2EA94E] to-[#07ed55] h-[2rem] w-full text-sm rounded-[.5rem] font-semibold ">
                        SignUp
                    </button>
                    <h2>Don't have an account?<span>SIGN UP</span></h2>
                    </div>
                </form>
            </div>
        </div>
    );
}
