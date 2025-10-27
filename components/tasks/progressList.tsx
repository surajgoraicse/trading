import TaskListItem, { TaskListItemProps } from "./progressListItem";


const tasks: TaskListItemProps[] = [
    {
        icon: "/man.png",
        title: "Your ID must be active",
        description: "Activate your ID to qualify for booster eligibility.",
        maxValue: 1,
        currentValue: 1,
        isCurrency: false,
        color: "#34d399", // emerald
    },
    {
        icon: "/money.png",
        title: "Your own package",
        description: "Minimum required package purchase of $250.",
        maxValue: 250,
        currentValue:100,
        isCurrency: true,
        color: "#facc15", // amber
    },
    {
        icon: "/referral.png",
        title: "Direct referrals",
        description: "You must have at least 5 active direct referrals.",
        maxValue: 5,
        currentValue: 3,
        isCurrency: false,
        color: "#60a5fa", // blue
    },
    {
        icon: "/connections.png",
        title: "Direct business volume",
        description: "Your direct business should reach $2000 total.",
        maxValue: 2000,
        currentValue: 400,
        isCurrency: true,
        color: "#f87171", // red
    },
];




const ProgressList = () => {
    return (
        <div className="flex flex-col items-center px-1 gap-2 ">
            {tasks.map((task, index) => (
                <TaskListItem key={index} {...task} />
            ))}
        </div>
    )
}

export default ProgressList