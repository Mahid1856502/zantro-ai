import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    ClaudeLogo,
    WhiteRabbitNeoLogo,
    LlamaLogo,
    DeepSeekLogo,
    QwenLogo,
} from "@/components/ui/icons";

type Card = {
    id: number;
    title: string;
    company: {
        name: string;
        url: string;
    };
    description: string | JSX.Element;
    icon: React.ComponentType<{ className?: string; color?: string }>;
    bgColor: string;
    iconBgColor: string;
    iconColor: string;
    titleColor: string;
    descriptionColor: string;
};

const CARDS: Card[] = [
    {
        id: 1,
        title: "Claude 3.5 Sonnet",
        company: {
            name: "Anthropic",
            url: "https://claude.ai/",
        },
        description:
            "Claude 3.5 Sonnet is an advanced AI language model developed by Anthropic. It excels in coding tasks, offering enhanced reasoning capabilities without increased latency, making it ideal for multi-step software development.",
        icon: ClaudeLogo,
        bgColor: "rgba(201, 255, 226, 1)",
        iconBgColor: "#d19b75",
        iconColor: "#01FFC9",
        titleColor: "#0A3F37",
        descriptionColor: "#0A3F37",
    },
    {
        id: 2,
        title: "WhiteRabbitNeo",
        company: {
            name: "WhiteRabbitNeo",
            url: "https://www.whiterabbitneo.com/",
        },
        description: (
            <>
                WhiteRabbitNeo serves as a cybersecurity co-pilot, assisting in identifying and mitigating security threats. It integrates seamlessly with development workflows to enhance security measures.
            </>
        ),
        icon: WhiteRabbitNeoLogo,
        bgColor: "rgba(229, 225, 248, 1)",
        iconBgColor: "rgba(255, 255, 255, 1)",
        iconColor: "#000000",
        titleColor: "#110D67",
        descriptionColor: "#110D67",
    },
    {
        id: 3,
        title: "Llama 3.2",
        company: {
            name: "Meta",
            url: "https://meta.com/",
        },
        description:
            "Llama 3.2 is part of Meta's series of large language models, designed to handle a wide range of natural language processing tasks with improved efficiency and accuracy.",
        icon: LlamaLogo,
        bgColor: "rgba(200, 230, 255, 1)",
        iconBgColor: "rgba(0, 0, 0, 1)",
        iconColor: "#FFFFFF",
        titleColor: "#002957",
        descriptionColor: "#002957",
    },
    {
        id: 4,
        title: "DeepSeek-Coder-V2",
        company: {
            name: "DeepSeek",
            url: "https://www.deepseek.com/",
        },
        description:
            "DeepSeek-Coder-V2 is an AI model optimized for code generation and editing. It effectively handles code modifications, including search and replace functions, enhancing development productivity. ",
        icon: DeepSeekLogo,
        bgColor: "rgba(225, 253, 175, 1)",
        iconBgColor: "rgba(255, 255, 255, 1)",
        iconColor: "#FFFFFF",
        titleColor: "#005F15",
        descriptionColor: "#005F15",
    },
    {
        id: 5,
        title: "Qwen 2.5 Coder",
        company: {
            name: "Alibaba Cloud",
            url: "https://www.alibaba.com/",
        },
        description:
            "Qwen 2.5 Coder is a specialized version of Alibaba's Qwen 2.5 model, tailored for coding tasks. It offers distinct versions for different applications, including coding and mathematical reasoning.",
        icon: QwenLogo,
        bgColor: "rgba(216, 250, 255, 1)",
        iconBgColor: "rgba(34, 128, 141, 1)",
        iconColor: "#FFFFFF",
        titleColor: "#003F48",
        descriptionColor: "#003F48",
    },
];

const ANIMATION_DURATION = 0.3;
const ANIMATION_DELAY = 0.2;

export default function ExpandableCards() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleCardClick = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getCardWidth = (cardId: number) =>
        expandedId === null
            ? "w-[185px]"
            : expandedId === cardId
                ? "w-[380px]"
                : "w-[185px]";

    return (
        <>
            {/* Desktop Layout */}
            <div className="hidden items-center justify-center px-6 py-4 lg:flex">
                <div className="w-full max-w-[1049px] rounded-xl border-2 border-gray-200 p-5 dark:border-gray-50">
                    <h1 className="pb-5 text-[28px] font-semibold leading-tight dark:text-gray-900 text-center">
                        Shipped with Top-Charted AI Models
                    </h1>
                    <div className="flex gap-5">
                        {CARDS.map((card) => (
                            <motion.div
                                key={card.id}
                                style={{
                                    backgroundColor: card.bgColor,
                                }}
                                className={cn(
                                    "relative h-44 cursor-pointer overflow-hidden rounded-xl",
                                    getCardWidth(card.id),
                                )}
                                layout
                                onClick={() => handleCardClick(card.id)}
                                transition={{ duration: ANIMATION_DURATION }}
                            >
                                <div className="relative flex h-full flex-col justify-between p-4">
                                    <motion.div
                                        layout
                                        style={{ backgroundColor: card.titleColor }}
                                        className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full opacity-50"
                                        transition={{ duration: ANIMATION_DURATION }}
                                    >
                                        <Plus
                                            style={{ color: card.bgColor }}
                                            className={cn(
                                                "h-4 w-4 stroke-[3.4] transition-transform duration-300",
                                                expandedId === card.id && "rotate-45",
                                            )}
                                        />
                                    </motion.div>

                                    {expandedId !== card.id ? (
                                        <>
                                            <motion.div
                                                layout="position"
                                                className="flex h-full flex-col justify-between"
                                            >
                                                <div
                                                    style={{
                                                        backgroundColor: card.iconBgColor,
                                                    }}
                                                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                                                >
                                                    <card.icon
                                                        className="h-10 w-10"
                                                        color={card.iconColor}
                                                    />
                                                </div>
                                                <h1
                                                    style={{
                                                        color: card.titleColor,
                                                    }}
                                                    className="whitespace-pre-line text-xl font-[550] leading-6"
                                                >
                                                    {card.title}
                                                    <br />
                                                    <span>{card.company.name}</span>
                                                    {/* <span className="opacity-50">*</span> */}
                                                </h1>
                                            </motion.div>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: ANIMATION_DELAY }}
                                            className="flex h-full flex-col"
                                        >
                                            <div
                                                style={{
                                                    color: card.titleColor,
                                                }}
                                                className="mb-3 text-xl font-[550] leading-6"
                                            >
                                                {card.title}{" "}
                                                <a
                                                    href={card.company.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {" "}
                                                    {card.company.name}
                                                </a>
                                            </div>
                                            <p
                                                style={{
                                                    color: card.descriptionColor,
                                                }}
                                                className="whitespace-pre-line text-sm"
                                            >
                                                {card.description}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-5">* Some models are not available in all regions. <br /> Local model support coming soon.</p>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="block w-full px-6 py-6 lg:hidden">
                <div className="mx-auto w-full max-w-3xl rounded-xl border-2 border-gray-200 px-5 py-5 dark:border-gray-50">
                    <h2 className="mb-5 text-2xl font-semibold dark:text-gray-900 md:text-[28px]">
                        Shipped with Top-Charted AI Models
                    </h2>
                    <div className="space-y-4">
                        {CARDS.map((card) => (
                            <div
                                key={card.id}
                                style={{
                                    backgroundColor: card.bgColor,
                                }}
                                className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-200 dark:border-gray-700 dark:bg-opacity-90"
                                onClick={() => handleCardClick(card.id)}
                            >
                                <div className="px-4 py-4">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div
                                                style={{
                                                    backgroundColor: card.iconBgColor,
                                                }}
                                                className="flex h-12 w-12 items-center justify-center rounded-xl"
                                            >
                                                <card.icon className="h-8 w-8" color={card.iconColor} />
                                            </div>
                                            <div
                                                style={{ color: card.titleColor }}
                                                className="text-base font-semibold sm:text-lg"
                                            >
                                                {card.title}{" "}
                                                {expandedId === card.id ? (
                                                    <a
                                                        href={card.company.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        {card.company.name}
                                                    </a>
                                                ) : (
                                                    <span>{card.company.name}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            style={{ backgroundColor: card.titleColor }}
                                            className="flex h-5 w-5 items-center justify-center rounded-full opacity-40"
                                        >
                                            <Plus
                                                style={{ color: card.bgColor }}
                                                className={cn(
                                                    "h-4 w-4 stroke-[3.4] transition-transform duration-300",
                                                    expandedId === card.id && "rotate-45",
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            "max-h-0 overflow-hidden whitespace-pre-line transition-all duration-300",
                                            expandedId === card.id && "max-h-[200px] pt-4",
                                        )}
                                    >
                                        <p
                                            style={{ color: card.descriptionColor }}
                                            className="ml-16 text-sm sm:text-base"
                                        >
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}