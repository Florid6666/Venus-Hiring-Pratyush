import { useState, useMemo } from "react";
import { Search, X, SearchX } from "lucide-react";
import { JobCard } from "./JobCard";
import { JobFilters } from "./JobFilters";
import { MOCK_JOBS, type JobItem } from "./mockJobs";

export function JobSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [location, setLocation] = useState("All");
  const [employmentType, setEmploymentType] = useState("All");
  const [experienceLevel, setExperienceLevel] = useState("All");

  // Extract unique filter options dynamically from data
  const departments = useMemo(() => {
    const set = new Set(MOCK_JOBS.map((j) => j.department));
    return ["All", ...Array.from(set)];
  }, []);

  const locations = useMemo(() => {
    return [
      "All",
      "Toronto, ON",
      "Toronto, ON (Hybrid)",
      "Vancouver, BC",
      "Montreal, QC (Hybrid)",
      "Remote (Canada)",
      "Remote (US)",
    ];
  }, []);

  const employmentTypes = useMemo(() => {
    const set = new Set(MOCK_JOBS.map((j) => j.employmentType));
    return ["All", ...Array.from(set)];
  }, []);

  const experienceLevels = useMemo(() => {
    const set = new Set(MOCK_JOBS.map((j) => j.experienceLevel));
    return ["All", ...Array.from(set)];
  }, []);

  // Filtered jobs calculation
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        department === "All" || job.department === department;

      const matchesLocation =
        location === "All" || job.location.includes(location);

      const matchesType =
        employmentType === "All" || job.employmentType === employmentType;

      const matchesLevel =
        experienceLevel === "All" || job.experienceLevel === experienceLevel;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesType &&
        matchesLevel
      );
    });
  }, [searchQuery, department, location, employmentType, experienceLevel]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDepartment("All");
    setLocation("All");
    setEmploymentType("All");
    setExperienceLevel("All");
  };

  return (
    <section id="open-positions" className="section-padding bg-porcelain/50 py-20 sm:py-24">
      <div className="shell">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            CAREER OPPORTUNITIES
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            OPEN POSITIONS
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Discover roles where you can innovate, grow, and shape the future of talent with Venus Hiring.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mx-auto max-w-2xl mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="h-14 w-full rounded-2xl border border-border/80 bg-card pl-12 pr-10 text-sm font-medium text-foreground shadow-soft placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Box */}
        <JobFilters
          departments={departments}
          locations={locations}
          employmentTypes={employmentTypes}
          experienceLevels={experienceLevels}
          selectedDepartment={department}
          selectedLocation={location}
          selectedEmploymentType={employmentType}
          selectedExperienceLevel={experienceLevel}
          onDepartmentChange={setDepartment}
          onLocationChange={setLocation}
          onEmploymentTypeChange={setEmploymentType}
          onExperienceLevelChange={setExperienceLevel}
          onResetFilters={handleResetFilters}
        />

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs font-semibold text-muted-foreground sm:text-sm">
          <span>
            Showing <strong className="text-foreground">{filteredJobs.length}</strong> {filteredJobs.length === 1 ? "position" : "positions"}
          </span>
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job: JobItem) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center my-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
              No matching positions found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              We couldn't find any positions matching your search filters. Try clearing your filters or searching for different keywords.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
