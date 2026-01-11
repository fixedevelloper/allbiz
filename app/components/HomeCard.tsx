import Image from "next/image";
import Link from "next/link";

const items = [
    {
        title: "Recharger",
        icon: "/icons/wallet.svg",
        href: "/dashboard/recharges",
    },
    {
        title: "Retrait",
        icon: "/icons/withdraw.svg",
        href: "/dashboard/withdraws",
    },
    {
        title: "Roulette",
        icon: "/icons/roulette.svg",
        href: "/dashboard/roulettes",
    },
    {
        title: "Inviter les amis",
        icon: "/icons/share.svg",
        href: "/dashboard/invite-freinds",
    },
    {
        title: "Service client",
        icon: "/icons/customer-service.svg",
        href: "/dashboard/savs",
    },
    {
        title: "Recompenses",
        icon: "/icons/winner.svg",
        href: "/dashboard/recompenses",
    },
    {
        title: "FAQ",
        icon: "/icons/faq.svg",
        href: "/dashboard/faqs",
    },
    {
        title: "Comment ca marche",
        icon: "/icons/user-question.svg",
        href: "/dashboard/how-works",
    },
    {
        title: "Apropos de nous",
        icon: "/icons/about.svg",
        href: "/dashboard/about",
    },
    {
        title: "Market",
        icon: "/icons/market.svg",
        href: "/market",
    },
];

export default function HomeGrid() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 px-2">
            {items.map((item, index) => (
                <Link href={item.href} key={item.title}>
                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-2 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                >
                    <div className="flex items-center justify-center h-20 bg-gray-100 rounded-xl">
                        <Image
                            src={item.icon}
                            alt={item.title}
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>

                    <div className="mt-3 flex flex-col grow">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-800 text-center truncate">
                            {item.title}
                        </h4>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
}
