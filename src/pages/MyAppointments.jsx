import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import api from "../api/axios";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await api.get("/appointments/user");
                setAppointments(res.data.data);
            } catch (err) {
                console.error("Failed to fetch appointments", err);
                // Fallback to mock data for demo
                setAppointments([
                    { id: "101", doctorName: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "2026-05-10", time: "10:30 AM", status: "Confirmed" },
                    { id: "102", doctorName: "Dr. Michael Chen", specialty: "Dermatologist", date: "2026-05-15", time: "02:15 PM", status: "Pending" }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
        
        try {
            await api.delete(`/appointments/${id}`);
            setAppointments(appointments.filter(app => app.id !== id));
        } catch (err) {
            console.error("Cancel failed", err);
            alert("Could not cancel appointment. It might be too late.");
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="max-w-6xl mx-auto px-8 sm:px-12 py-16 md:py-24">
                <header className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-12 animate-fade-in">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight text-white">Your <span className="text-primary">Appointments</span></h1>
                        <p className="text-text-muted text-xl max-w-xl leading-relaxed font-medium">Track, manage, and reschedule your upcoming healthcare visits in one place.</p>
                    </div>
                    <div className="flex gap-6">
                        <div className="glass px-8 py-5 rounded-3xl flex flex-col items-center border-white/10 shadow-xl">
                            <span className="text-3xl font-black text-primary">{appointments.length}</span>
                            <span className="text-[10px] uppercase font-black text-text-dim tracking-[0.2em] mt-1">Total Bookings</span>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="space-y-8">
                        {[1, 2].map(i => <div key={i} className="h-48 glass-card animate-pulse" />)}
                    </div>
                ) : appointments.length === 0 ? (
                    <Card className="text-center py-32 border-dashed border-2 border-white/10 bg-transparent rounded-[40px]">
                        <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                            <span className="text-6xl">📅</span>
                        </div>
                        <h2 className="text-4xl font-black mb-6 tracking-tight text-white">No appointments found</h2>
                        <p className="text-text-muted mb-12 max-w-md mx-auto text-lg leading-relaxed font-medium">You haven't scheduled any appointments yet. Explore our specialists and book your first visit.</p>
                        <Button onClick={() => window.location.href = "/"} className="px-12 py-5 text-xs font-black uppercase tracking-widest">Explore Specialists</Button>
                    </Card>
                ) : (
                    <div className="space-y-10">
                        {appointments.map((app, index) => (
                            <Card 
                                key={app.id} 
                                padding="p-0" 
                                className="group overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500 rounded-[32px]"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-12 flex flex-col items-center justify-center md:w-64 text-center border-b md:border-b-0 md:border-r border-white/5 group-hover:from-primary/20 transition-all duration-500">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-2 opacity-60">
                                            {new Date(app.date).toLocaleString('default', { weekday: 'long' })}
                                        </span>
                                        <span className="text-6xl font-black text-white group-hover:scale-110 transition-transform duration-500">{app.date.split("-")[2]}</span>
                                        <span className="text-text-muted uppercase text-xs font-black tracking-[0.3em] mt-2">
                                            {new Date(app.date).toLocaleString('default', { month: 'long' })}
                                        </span>
                                    </div>
                                    <div className="flex-1 p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-5">
                                                <h3 className="text-3xl font-black group-hover:text-primary transition-colors text-white tracking-tight">{app.doctorName}</h3>
                                                <span className={`text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-sm ${
                                                    app.status === 'Confirmed' ? 'bg-success/10 text-success border border-success/20' : 'bg-warning/10 text-warning border border-warning/20'
                                                }`}>
                                                    {app.status}
                                                </span>
                                            </div>
                                            <p className="text-secondary text-xs font-black tracking-[0.25em] uppercase">{app.specialty}</p>
                                            <div className="flex flex-wrap items-center gap-8 pt-2">
                                                <div className="flex items-center gap-3 glass px-5 py-2.5 rounded-2xl border-white/5">
                                                    <span className="text-lg opacity-70">🕒</span> 
                                                    <span className="text-sm font-bold text-white/90">{app.time}</span>
                                                </div>
                                                <div className="flex items-center gap-3 glass px-5 py-2.5 rounded-2xl border-white/5">
                                                    <span className="text-lg opacity-70">📍</span> 
                                                    <span className="text-sm font-bold text-white/90">Main Medical Center</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 min-w-[200px]">
                                            <Button variant="outline" className="bg-white/5 border border-white/10 text-text-main hover:bg-white/10 py-4 text-[10px] font-black uppercase tracking-[0.2em] flex-1">
                                                Reschedule
                                            </Button>
                                            <Button 
                                                className="bg-error/10 text-error hover:bg-error hover:text-white border border-error/20 py-4 text-[10px] font-black uppercase tracking-[0.2em] flex-1"
                                                onClick={() => handleCancel(app.id)}
                                            >
                                                Cancel Visit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyAppointments;
