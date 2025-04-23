import { Position, Reservation } from '@/types';
import TransactionsTable from './transactions-table';

export function HistoryTab({ handleClickTransaction }: {
  handleClickTransaction: (transaction: Position | Reservation) => void;}) {
  return (
    <div className="w-[1070px] py-5 px-4">
      <TransactionsTable handleClickTransaction={handleClickTransaction} />
    </div>
  );
}
