import { LABEL_PADDING_X } from "@/lib/timeline/measure-label";

export const LABEL_HOVER_IMAGE_SIZE = 26;
export const LABEL_HOVER_IMAGE_GAP = 8;
export const LABEL_HOVER_IMAGE_SLOT = LABEL_HOVER_IMAGE_SIZE + LABEL_HOVER_IMAGE_GAP;

type TimelineLabelContentProps = {
  title: string;
  width: number;
  height: number;
  paddingX?: number;
  textClassName: string;
  imageUrl?: string | null;
  showImage?: boolean;
  imageClipId?: string;
};

export function timelineLabelHoverWidth(baseWidth: number, hasImage: boolean): number {
  if (!hasImage) {
    return baseWidth;
  }

  return baseWidth + LABEL_HOVER_IMAGE_SLOT;
}

export function TimelineLabelContent({
  title,
  width,
  height,
  paddingX = LABEL_PADDING_X,
  textClassName,
  imageUrl,
  showImage = false,
  imageClipId,
}: TimelineLabelContentProps) {
  const hasImage = Boolean(showImage && imageUrl);
  const imageY = (height - LABEL_HOVER_IMAGE_SIZE) / 2;
  const textX = hasImage ? paddingX + LABEL_HOVER_IMAGE_SLOT : paddingX;
  const textWidth = Math.max(width - textX - paddingX, 0);

  return (
    <>
      {hasImage && imageUrl && imageClipId && (
        <>
          <defs>
            <clipPath id={imageClipId}>
              <rect
                x={paddingX}
                y={imageY}
                width={LABEL_HOVER_IMAGE_SIZE}
                height={LABEL_HOVER_IMAGE_SIZE}
                rx={4}
                ry={4}
              />
            </clipPath>
          </defs>
          <image
            href={imageUrl}
            x={paddingX}
            y={imageY}
            width={LABEL_HOVER_IMAGE_SIZE}
            height={LABEL_HOVER_IMAGE_SIZE}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${imageClipId})`}
            className="pointer-events-none"
          />
        </>
      )}
      <text
        x={textX + textWidth / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className={textClassName}
      >
        {title}
      </text>
    </>
  );
}
