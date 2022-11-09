import LoginForm from '@/components/Forms/LoginForm';
import { useRouter } from 'next/router';

export default function Login({ setSignedIn }) {
	const router = useRouter();
	router.push('/');
	return <LoginForm setSignedIn={setSignedIn} />;
}
