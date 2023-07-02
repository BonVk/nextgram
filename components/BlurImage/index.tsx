import Image from "next/image";
import { useState } from "react";
import cn from "clsx";

export default function BlurImage(props) {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      {...props}
      onLoadingComplete={() => setLoading(false)}
    />
  );
}
