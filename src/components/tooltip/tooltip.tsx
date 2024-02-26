interface ToolTipProps {
    title?: string;

}

export const ToolTipComponent = ({ title }: ToolTipProps) => {
    return (
        <button
            type="button"
            className="inline-block rounded-full bg-gray-600 px-2 py-1 text-xs text-white transition duration-150 ease-in-out"
            data-te-toggle="tooltip"
            data-te-placement="left"
            data-te-ripple-init
            data-te-ripple-color="light"
            title={title}>
            ?
        </button>
    );
}