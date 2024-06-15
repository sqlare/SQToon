import Image from "next/image";
import Link from "next/link";

export async function getData() {
    const res = await fetch('https://f.imnyang.xyz/Sqlare/WebToon/main.json');
    const data = await res.json();

    const webtoons = Object.values(data.data).map(entry => ({
        title: entry.title,
        author: entry.author,
        total: entry.total
    }));

    return {
        props: {
            webtoons
        }
    };
}

export default async function Home() {
    const { props } = await getData();
    const { webtoons } = props;

    return (
        <main className="flex min-h-screen flex-col">
            <header className="p-5 bg-[#1d1e25]">
                <Link href="/" className="flex flex-row items-center">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                    <p className="pl-3 font-extrabold">SQToon</p>
                </Link>
            </header>
            <div className="flex flex-col items-center justify-center">
                {webtoons.map((webtoon, index) => (
                    <Link key={index} href={`/l/${index}`} className="flex flex-col w-full p-5 mb-4">
                        <div className="flex flex-col w-[95%] bg-[#1B1C23] content-border p-5 mb-4">
                            <p className="font-bold text-[14pt]">{webtoon.title}</p>
                            <p>{webtoon.author} - {webtoon.total}화 연재 됨</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
