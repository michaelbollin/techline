import { splitTextWithGlossary } from "@/lib/glossary";

type TimelineLabelContentProps = {
  title: string;
  width: number;
  height: number;
  textClassName: string;
};

export function TimelineLabelContent({
  title,
  width,
  height,
  textClassName,
}: TimelineLabelContentProps) {
  const parts = splitTextWithGlossary(title);

  return (
    <text
      x={width / 2}
      y={height / 2}
      textAnchor="middle"
      dominantBaseline="central"
      className={textClassName}
    >
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <tspan key={index}>{part.value}</tspan>;
        }

        return (
          <tspan key={index} className="cursor-help">
            <title>{part.explanation}</title>
            {part.value}
          </tspan>
        );
      })}
    </text>
  );
}
