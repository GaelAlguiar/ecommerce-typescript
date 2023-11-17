interface NullDataPros {
  title: string;
}

const NullData: React.FC<NullDataPros> = ({ title }) => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl">
      <p>{title}</p>
    </div>
  );
};

export default NullData;
