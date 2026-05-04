import Button from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'info'; // Để đổi màu nút xác nhận
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  type = 'danger',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Lớp nền mờ (Overlay) */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />

      {/* Nội dung Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-50 p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
        <h3 className="text-xl font-extrabold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-500 mb-8 leading-relaxed text-sm">{message}</p>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <div className="w-auto min-w-[120px]">
            <Button
              onClick={onConfirm}
              isLoading={isLoading}
              // Ghi đè class của Button gốc để phù hợp với hoàn cảnh
              className={`!w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-sm ${
                type === 'danger'
                  ? 'bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-100'
                  : 'bg-pastel-teal hover:bg-[#326e6e] focus:ring-4 focus:ring-pastel-ice'
              }`}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
