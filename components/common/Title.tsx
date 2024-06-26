interface TitleProps {
  titleText: string;
  subTitle: string;
}

export const Title: React.FC<TitleProps> = ({ titleText, subTitle }) => (
  <div className=" w-full justify-center text-center">
    <h2 className="align-middle justify-self-center mb-2 lg:mb-5">
      {titleText}
    </h2>
    <h4 className="text-xl sm:text-sm text-gray break-keep">{subTitle}</h4>
  </div>
);
