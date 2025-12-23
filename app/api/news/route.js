import { parseStringPromise } from "xml2js";

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "india";
    const lang = searchParams.get("lang") || "en";
    const country = searchParams.get("country") || "IN";

    const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
        query
    )}&hl=${lang}&gl=${country}&ceid=${country}:${lang}`;

    try {
        const res = await fetch(rssUrl);
        const xml = await res.text();

        const parsed = await parseStringPromise(xml);
        const items = parsed.rss.channel[0].item;

        const news = items.slice(0, 10).map((item) => ({
            title: item.title[0],
            link: item.link[0],
            pubDate: item.pubDate[0],
            source: item.source?.[0]?._ || "Google News",
        }));

        return Response.json(news);
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to fetch news" }),
            { status: 500 }
        );
    }
}
