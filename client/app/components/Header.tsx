import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
interface HeaderProps {
    currentUser: {
        email: string;
    } | null;
}
interface AuthLink {
    label: string;
    href: string;
}

export default function Header({ currentUser }: HeaderProps) {
    const authList: JSX.Element[] = [
        !currentUser && { label: "Sign Up", href: "/auth/signup" },
        !currentUser && { label: "Sign In", href: "/auth/signin" },
        currentUser && { label: "Sign Out", href: "/auth/signout" },
    ]
        .filter((item): item is AuthLink => Boolean(item))
        .map(({ label, href }) => {
            return (
                <li className="list-none mr-3" key={label}>
                    <Link href={href}>{label}</Link>
                </li>
            );
        });

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a>Homepage</a>
                        </li>
                        <li>
                            <a>Portfolio</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl text-main-yellow-color">
                    StarFares
                </a>
            </div>
            <div className="navbar-end">
                {authList}
                <ThemeToggle />
            </div>
        </div>
    );
}
