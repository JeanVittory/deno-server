import { Handlebars, HandlebarsConfig } from 'https://deno.land/x/handlebars/mod.ts';
import express from 'npm:express';

// First, create instance of Handlebars

// or with custom config

// by default uses this config:
const DEFAULT_HANDLEBARS_CONFIG: HandlebarsConfig = {
	baseDir: 'views',
	extname: '.hbs',
	layoutsDir: 'layouts/',
	partialsDir: '',
	cachePartials: true,
	defaultLayout: 'main',
	helpers: undefined,
	compilerOptions: undefined,
};

const handle = new Handlebars(DEFAULT_HANDLEBARS_CONFIG);

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const colors: string[] = ['red', 'blue'];

app.get('/', async (_req: any, res: any) => {
	const result: string = await handle.renderView('index', { colors });
	res.send(result);
});

app.post('/', async (req: any, res: any) => {
	const { color } = req.body;
	colors.push(color);
	const result: string = await handle.renderView('index', { colors });
	res.send(result);
});

app.listen(3000, () => console.log('servidor corriendo'));
