import Link from "next/link";
import Image from "next/image";

export async function getData() {
    const res = await fetch('https://f.imnyang.xyz/Sqlare/WebToon/main.json');
    const data = await res.json();

    const webtoons = Object.keys(data.data).map(key => {
        const entry = data.data[key];
        const episodes = Object.keys(entry)
            .filter(k => k !== 'total' && k !== 'title' && k !== 'author')
            .map(k => ({
                title: entry[k].title,
                total: entry[k].total,
                data: entry[k].data
            }));
        return {
            total: entry.total,
            title: entry.title,
            author: entry.author,
            episodes
        };
    });

    return {
        props: {
            webtoons
        }
    };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const { props } = await getData();
    const { webtoons } = props;

    const toonIndex = parseInt(params.slug[0]);
    const episodeIndex = parseInt(params.slug[1]);

    // Check if the indices are valid
    if (isNaN(toonIndex) || toonIndex >= webtoons.length || toonIndex < 0) {
        return <div>Invalid toon index</div>;
    }

    const selectedToon = webtoons[toonIndex];

    if (isNaN(episodeIndex) || episodeIndex >= selectedToon.episodes.length || episodeIndex < 0) {
        return <div>Invalid episode index</div>;
    }

    const selectedEpisode = selectedToon.episodes[episodeIndex];

    return (
        <main className="flex min-h-screen flex-col">
            <header className="p-5 bg-[#1d1e25]">
                <Link href="/" className="flex flex-row items-center">
                    <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                    <p className="pl-3 font-extrabold">SQToon</p>
                </Link>
            </header>
            <div className="flex flex-col items-center justify-center">
                <div>{selectedToon.title} - {selectedEpisode.title}</div>
                {selectedEpisode.data.map((img, index) => (
                    <Image
                        key={index}
                        src={`https://f.imnyang.xyz/Sqlare/WebToon/${toonIndex}/${episodeIndex}/${img}`}
                        alt={img}
                        width={500}
                        height={500}
                    />
                ))}
            </div>
        </main>
    );
}
