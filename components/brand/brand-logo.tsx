import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/logo-efetto-dark.webp"
      alt="Efetto"
      width={520}
      height={156}
      priority={priority}
      className={className}
    />
  );
}
