export const GenderCheckBox = () => {
  return (
    <div className="flex mt-1">
      <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Male </span>
            <input type="checkbox"  className="checkbox ml-1" />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text ml-2">Female</span>
            <input type="checkbox"  className="checkbox ml-1" />
          </label>
        </div>
    </div>
  );
};
