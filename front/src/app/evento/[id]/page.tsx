interface Params {
    id: string;
}

export default function App({ params }: { params: Params }) {
    const { id } = params;

    return (
        <section className="flex flex-col gap-4 mt-10 px-2 md:flex-row md:h-[calc(100vh-104px)]">
            <h1>
                {id}
            </h1>
        </section>
    )
}