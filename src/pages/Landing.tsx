import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PieChart, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: PieChart, title: 'Smart Tracking', desc: 'Visualize your spending with beautiful charts and breakdowns.' },
  { icon: Sparkles, title: 'AI Categorization', desc: 'Expenses are automatically categorized using AI intelligence.' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your financial data is encrypted and never shared.' },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="font-heading text-2xl font-bold text-primary">DompetKu</span>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Finance Tracker
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Track your money,
            <span className="text-primary"> effortlessly.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto">
            DompetKu helps students and young adults understand their spending with smart AI insights and beautiful visualizations.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="gap-2 gradient-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                Start for Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Log in
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass-card p-8"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 DompetKu. Built for students, by students.
      </footer>
    </div>
  );
};

export default Landing;
