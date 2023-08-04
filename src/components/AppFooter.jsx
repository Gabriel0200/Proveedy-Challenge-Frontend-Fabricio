export const AppFooter = () => {
  const ageCurrent = new Date().getFullYear();
  return (
    <div>
      <p>&copy; {ageCurrent} desarrollado por YachAI</p>
    </div>
  );
};
