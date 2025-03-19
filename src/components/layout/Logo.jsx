const Logo = ({ image, text, className }) => {
    return <img src={image} alt={text} className={`logo ${className}`} />;
};

export default Logo;
