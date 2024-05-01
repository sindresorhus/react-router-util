import React, {type ReactNode, type ComponentType} from 'react';
import {
	Route,
	Navigate,
	Link,
	useLocation,
	useNavigate,
	useParams,
	type LinkProps,
} from 'react-router-dom';
import {createBrowserHistory, createMemoryHistory} from 'history';

// eslint-disable-next-line @typescript-eslint/naming-convention
const canUseDOM = Boolean(
	typeof window !== 'undefined'
	&& window.document?.createElement,
);

export const history = canUseDOM ? createBrowserHistory() : createMemoryHistory();

export {BrowserRouter, StaticRouter} from 'react-router-dom';

export function Debug() {
	const location = useLocation();
	const parameters = useParams();

	// eslint-disable-next-line n/prefer-global/process
	if (process.env['NODE_ENV'] !== 'production') {
		console.log('Route:', location.pathname, {location, params: parameters});
	}

	return null;
}

export function CurrentRoute() {
	const location = useLocation();
	return <span>{location.pathname}</span>;
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export type RouteWithPropsProps = {
	readonly [key: string]: any;
	readonly element: ComponentType<any>;
	// eslint-disable-next-line react/boolean-prop-naming
	readonly caseSensitive?: boolean;
	readonly path?: string;
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export function RouteWithProps({
	path,
	caseSensitive,
	element: Component,
	...rest
}: RouteWithPropsProps) {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	function ComponentWithProps() {
		return <Component {...rest}/>;
	}

	return (
		<Route
			path={path}
			caseSensitive={caseSensitive}
			element={<ComponentWithProps/>}
		/>
	);
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export type AuthenticatedRouteProps = {
	readonly isAuthenticated: boolean;
	readonly children?: ReactNode;
	readonly element?: ReactNode;
	readonly loginPath?: string;
	readonly redirectFromLoginTo?: string;
	readonly redirectTo?: string;
};

export function AuthenticatedRoute({
	isAuthenticated,
	redirectTo,
	element,
	loginPath = '/login',
	redirectFromLoginTo,
	children,
}: AuthenticatedRouteProps) {
	const location = useLocation();

	if (!isAuthenticated) {
		// Special case: allow access to login path even when not authenticated
		// This handles nested login routes like /dashboard/login
		if (loginPath && location.pathname === loginPath) {
			return (
				<>
					{children}
					{element}
				</>
			);
		}

		// Otherwise redirect to login
		return <Navigate replace to={loginPath}/>;
	}

	if (redirectFromLoginTo && location.pathname === loginPath) {
		return <Navigate replace to={redirectFromLoginTo}/>;
	}

	if (redirectTo) {
		return <Navigate replace to={redirectTo}/>;
	}

	return (
		<>
			{children}
			{element}
		</>
	);
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export type ConditionalRouteProps = {
	readonly [key: string]: any;
	// eslint-disable-next-line react/boolean-prop-naming
	readonly conditional: boolean;
	readonly falseElement?: ReactNode;
	readonly falseRedirectTo?: string;
	readonly trueElement?: ReactNode;
	readonly trueRedirectTo?: string;
};

export function ConditionalRoute({
	conditional,
	trueElement,
	falseElement,
	trueRedirectTo,
	falseRedirectTo,
	...rest
}: ConditionalRouteProps) {
	if (conditional) {
		return trueElement
			? <Route {...rest} element={trueElement}/>
			: <Route {...rest} element={<Navigate replace to={trueRedirectTo ?? ''}/>}/>;
	}

	return falseElement
		? <Route {...rest} element={falseElement}/>
		: <Route {...rest} element={<Navigate replace to={falseRedirectTo ?? ''}/>}/>;
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export type BackLinkProps = Omit<LinkProps, 'to'> & {
	readonly children: ReactNode;
};

export function BackLink({children, ...rest}: BackLinkProps) {
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		void navigate(-1);
	};

	return (
		<Link {...rest} to='' onClick={handleClick}>
			{children}
		</Link>
	);
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export type ForwardLinkProps = Omit<LinkProps, 'to'> & {
	readonly children: ReactNode;
};

export function ForwardLink({children, ...rest}: ForwardLinkProps) {
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		void navigate(1);
	};

	return (
		<Link {...rest} to='' onClick={handleClick}>
			{children}
		</Link>
	);
}
