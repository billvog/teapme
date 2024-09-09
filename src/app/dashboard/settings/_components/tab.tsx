function Tab({ children }: { children: React.ReactNode }) {
  return <div className="space-y-10">{children}</div>;
}

Tab.Header = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2 text-center">{children}</div>;
};

Tab.Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-3xl font-bold">{children}</h1>;
};

Tab.Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
};

Tab.Content = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Tab;
