import Header from "./Header";

export default function ErrorPage() {
    return (
        <div>
            <Header isDisabled={true}/>
            <h1 className="text-center font-bold text-4xl text-red-600 mt-24 underline">Internal Server Error...</h1>
        </div>
    );
}