import express from 'express';
import bodyParser from "body-parser";
import {calculateBmi, parseBmiArguments} from "./calculate_bmi";

const app = express();
app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;

    if (!weight || !height) {
        res.status(400);
        res.send({ error: 'missing parameter height or weight' });
    } else {
        try {
            const { heightInCm, weightInKg } = parseBmiArguments(
                Number(height),
                Number(weight)
            );
            const bmi = calculateBmi(heightInCm, weightInKg);
            res.send({
                weight: weightInKg,
                height: heightInCm,
                bmi: bmi
            });
        } catch (e) {
            res.status(400);
            res.send({ error: e.message });
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});