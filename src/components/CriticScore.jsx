const CriticScore = ({ score }) => {
    // تحديد لون الخلفية بناءً على قيمة التقييم بما يتناسب مع ألوان الموقع
    const getColorClass = () => {
        if (score >= 75) return "bg-[#6d0099] text-white"; 
        if (score >= 60) return "bg-[#720065] text-white"; 
        return "bg-[#050040] text-white";
    };

    return (
        <span className={`${getColorClass()} text-sm font-medium me-2 px-2.5 py-0.5 rounded`}>
            {score}
        </span>
    );
};

export default CriticScore;
