import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    Check,
    Search,
    X,
    Zap,
    Lock
} from "lucide-react";
import { TEMPLATES } from "../data/templates";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

type PricingFilter = 'all' | 'free' | 'paid';

export default function Templates() {
    const [searchQuery, setSearchQuery] = useState("");
    const [pricingFilter, setPricingFilter] = useState<PricingFilter>('all');

    // Get unique categories from templates
    const categories = useMemo(() => {
        const cats = new Set(TEMPLATES.map(t => t.category).filter(Boolean));
        return ['All', ...Array.from(cats)] as string[];
    }, []);

    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter templates based on search, pricing, and category
    const filteredTemplates = useMemo(() => {
        return TEMPLATES.filter(template => {
            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                template.title.toLowerCase().includes(searchLower) ||
                template.name.toLowerCase().includes(searchLower) ||
                template.description.toLowerCase().includes(searchLower) ||
                template.tags.some(tag => tag.toLowerCase().includes(searchLower));

            // Pricing filter
            const matchesPricing = pricingFilter === 'all' || template.pricing === pricingFilter;

            // Category filter
            const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;

            return matchesSearch && matchesPricing && matchesCategory;
        });
    }, [searchQuery, pricingFilter, selectedCategory]);

    const clearSearch = () => setSearchQuery("");

    return (
        <div className="min-h-screen bg-background">

            {/* Hero with Search */}
            <section className="py-12 px-6 border-b border-border bg-gradient-to-b from-muted/30 to-background">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                            Template Gallery
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Invoice Templates
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Choose from our collection of professionally designed invoice templates.
                            Each template is optimized for different business needs.
                        </p>
                    </motion.div>

                    {/* Search Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-2xl mx-auto mb-8"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <Input
                                type="text"
                                placeholder="Search templates by name, tags, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-12 py-6 text-base rounded-xl border-border bg-surface-elevated focus:ring-2 focus:ring-primary/20"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        {/* Pricing Filter */}
                        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
                            <button
                                onClick={() => setPricingFilter('all')}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                                    pricingFilter === 'all'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                All Plans
                            </button>
                            <button
                                onClick={() => setPricingFilter('free')}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5",
                                    pricingFilter === 'free'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Zap size={14} />
                                Free Plan
                            </button>
                            <button
                                onClick={() => setPricingFilter('paid')}
                                className={cn(
                                    "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5",
                                    pricingFilter === 'paid'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Lock size={14} />
                                Pro Plan
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                                        selectedCategory === category
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Results count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-foreground">{filteredTemplates.length}</span> of {TEMPLATES.length} templates
                        </p>
                        {(searchQuery || pricingFilter !== 'all' || selectedCategory !== 'All') && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setPricingFilter('all');
                                    setSelectedCategory('All');
                                }}
                                className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                            >
                                Clear all filters <X size={14} />
                            </button>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        {filteredTemplates.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center py-20"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                    <Search size={24} className="text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
                                <p className="text-muted-foreground mb-4">
                                    Try adjusting your search or filters
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setPricingFilter('all');
                                        setSelectedCategory('All');
                                    }}
                                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                    Reset filters
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredTemplates.map((template, index) => (
                                    <motion.div
                                        key={template.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="group"
                                    >
                                        <div className="border border-border rounded-2xl overflow-hidden bg-surface-elevated hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                                            {/* Preview Image */}
                                            <div className="relative aspect-[4/5] bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                                                <img
                                                    src={template.img}
                                                    alt={`${template.name} invoice template preview`}
                                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />

                                                {/* Plan Badge */}
                                                <div className="absolute top-4 left-4">
                                                    {template.pricing === 'free' ? (
                                                        <Badge variant="secondary" className="bg-emerald-500/90 text-white border-0 backdrop-blur-sm">
                                                            <Zap size={12} className="mr-1" />
                                                            Free Plan
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0 backdrop-blur-sm">
                                                            <Lock size={12} className="mr-1" />
                                                            Pro Plan
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Status Badge */}
                                                {template.badge && (
                                                    <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary text-primary-foreground">
                                                        {template.badge}
                                                    </span>
                                                )}

                                                {/* Overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            {/* Content */}
                                            <div className="p-5">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="text-xl font-semibold text-foreground">{template.title}</h3>
                                                    {template.category && (
                                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                                            {template.category}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                                                    {template.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1.5 mb-5">
                                                    {template.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                                                        >
                                                            <Check size={10} className="text-primary" />
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* CTA */}
                                                <Link
                                                    to={`/?template=${template.id}`}
                                                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors group"
                                                >
                                                    Use Template
                                                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6 border-t border-border">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-3">Need a Custom Template?</h2>
                    <p className="text-muted-foreground mb-6">
                        Contact us to create a custom invoice template tailored to your brand and requirements.
                    </p>
                    <a
                        href="mailto:support@karapi.io"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors"
                    >
                        Contact Us <ArrowRight size={16} />
                    </a>
                </div>
            </section>
        </div>
    );
}
