import { cn } from "@lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 gap-4 max-w-7xl mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento active:shadow-neu-hover hover:shadow-neu-hover hover:-translate-y-1 transition duration-300 dark:shadow-none p-6 bg-background border border-transparent justify-between flex flex-col space-y-4",
        className,
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-bold text-foreground group-hover/bento:text-primary transition-colors duration-200 mb-2 mt-2 text-xl">
          {title}
        </div>
        <div className="font-normal text-muted-foreground text-base font-sans">
          {description}
        </div>
      </div>
    </div>
  );
};
