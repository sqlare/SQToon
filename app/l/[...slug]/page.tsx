import Link from "next/link";
import Image from "next/image";

export default async function Page({ params }: { params: { slug: string[] } }) {
    async function getData() {
        const res = await fetch('https://f.imnyang.xyz/Sqlare/WebToon/main.json');
        const data = await res.json();

        // Ensure the data is properly structured
        const entry = data.data[params.slug[0]];
        const webtoons = Object.keys(entry)
            .filter(key => key !== 'total' && key !== 'title' && key !== 'author')
            .map(key => ({
                total: entry[key].total,
                title: entry[key].title,
                data: entry[key].data,
            }));

        return {
            webtoons,
            title: entry.title,
            total: entry.total
        };
    }

    const { webtoons, title, total } = await getData();

    return (
        <main className="flex min-h-screen flex-col">
            <header className="p-5 bg-[#1d1e25]">
                <Link href="/" className="flex flex-row items-center">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                    <p className="pl-3 font-extrabold">SQToon</p>
                </Link>
            </header>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-start justify-start text-left w-full pl-5 pb-5">{params.slug[0]} / {total}</div>
                {webtoons.map((webtoon, index) => (
                    <Link key={index} className="flex flex-col w-[100%] p-5 pb-0 pt-0" href={`/w/${params.slug[0]}/${index}`}>
                        <div key={index} className="flex flex-col w-[95%] bg-[#1B1C23] content-border p-5 mb-4">
                            <p className="font-bold text-[14pt]">{webtoon.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
