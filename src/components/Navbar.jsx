import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="glass sticky top-6 z-50 px-8 py-4 flex items-center justify-between mx-auto max-w-7xl rounded-2xl shadow-2xl shadow-black/20">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-black text-xl">A</span>
                </div>
                <span className="text-2xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                    Appointly
                </span>
            </Link>

            <div className="flex items-center gap-8">
                {user ? (
                    <>
                        <div className="hidden md:flex items-center gap-8">
                            <Link to="/" className="text-sm font-bold uppercase tracking-widest text-text-dim hover:text-primary transition-colors">Dashboard</Link>
                            <Link to="/my-appointments" className="text-sm font-bold uppercase tracking-widest text-text-dim hover:text-primary transition-colors">Bookings</Link>
                        </div>
                        <div className="flex items-center gap-5 ml-6 pl-6 border-l border-white/10">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-xs font-black uppercase tracking-wider text-white">{user.name}</span>
                                <span className="text-[10px] font-bold uppercase text-primary/80">{user.role}</span>
                            </div>
                            <Button
                                onClick={handleLogout}
                                className="px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-none"
                            >
                                Sign Out
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex gap-6">
                        <Link to="/login" className="text-sm font-bold uppercase tracking-widest text-text-dim hover:text-primary transition-colors self-center">Sign In</Link>
                        <Link to="/register">
                            <Button className="px-8 py-2.5 text-[10px] font-black uppercase tracking-[0.2em]">Join Now</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
