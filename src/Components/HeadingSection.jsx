const HeadingSection = ({ title, size }) => {
  return (
    <div className="heading-section text-lg-center">
      <h4>
        {title}
        {size ? `: ${size}` : ""}
      </h4>
    </div>
  );
};

export default HeadingSection;
