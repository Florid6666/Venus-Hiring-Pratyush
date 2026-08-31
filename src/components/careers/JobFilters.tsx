import { Filter, RotateCcw } from "lucide-react";

interface JobFiltersProps {
  departments: string[];
  locations: string[];
  employmentTypes: string[];
  experienceLevels: string[];
  selectedDepartment: string;
  selectedLocation: string;
  selectedEmploymentType: string;
  selectedExperienceLevel: string;
  onDepartmentChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onEmploymentTypeChange: (value: string) => void;
  onExperienceLevelChange: (value: string) => void;
  onResetFilters: () => void;
}

export function JobFilters({
  departments,
  locations,
  employmentTypes,
  experienceLevels,
  selectedDepartment,
  selectedLocation,
  selectedEmploymentType,
  selectedExperienceLevel,
  onDepartmentChange,
  onLocationChange,
  onEmploymentTypeChange,
  onExperienceLevelChange,
  onResetFilters,
}: JobFiltersProps) {
  const hasActiveFilters =
    selectedDepartment !== "All" ||
    selectedLocation !== "All" ||
    selectedEmploymentType !== "All" ||
    selectedExperienceLevel !== "All";

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-soft mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-border/60">
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
          <Filter className="h-4 w-4 text-brand" />
          <span>Filter Positions</span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-brand transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Department Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="dept-filter" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Department
          </label>
          <select
            id="dept-filter"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="location-filter" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Location
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="type-filter" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Employment Type
          </label>
          <select
            id="type-filter"
            value={selectedEmploymentType}
            onChange={(e) => onEmploymentTypeChange(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="level-filter" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Experience Level
          </label>
          <select
            id="level-filter"
            value={selectedExperienceLevel}
            onChange={(e) => onExperienceLevelChange(e.target.value)}
            className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {experienceLevels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
