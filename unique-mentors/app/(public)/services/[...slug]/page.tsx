import { redirect } from 'next/navigation';

export default function ServicesFallback() {
  redirect('/contact');
}
