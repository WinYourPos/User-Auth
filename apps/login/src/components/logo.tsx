type Props = {
  darkSrc?: string;
  lightSrc?: string;
  height?: number;
  width?: number;
};

const FALLBACK_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo/company-logo.svg`;

export function Logo({ lightSrc, darkSrc, height = 40, width = 147.5 }: Props) {
  const light = lightSrc || FALLBACK_SRC;
  const dark = darkSrc || FALLBACK_SRC;
  return (
    <>
      <div className="hidden dark:flex">
        <img className="wyp-brand-logo" height={height} width={width} src={dark} alt="WinYourPos logo" />
      </div>
      <div className="flex dark:hidden">
        <img className="wyp-brand-logo" height={height} width={width} src={light} alt="WinYourPos logo" />
      </div>
    </>
  );
}
