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
  return (
    <text
      x={width / 2}
      y={height / 2}
      textAnchor="middle"
      dominantBaseline="central"
      className={textClassName}
    >
      {title}
    </text>
  );
}
