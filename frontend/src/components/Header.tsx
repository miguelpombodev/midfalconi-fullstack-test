import Image from "next/image";

export function Header() {
  return (
    <header
      className="
    flex w-full justify-center bg-white p-4 
    shadow-md
  "
    >
      <Image
        width={100}
        height={100}
        className="
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:opacity-90
    "
        src="https://cdn.privacytools.com.br/assets/49858405-e413-44c9-b221-2c71f3a47ab3/banner/239FB9D654A17C0B20335164E8D83DF8.png"
        alt="mid-falconi logo"
        priority
      />
    </header>
  );
}
