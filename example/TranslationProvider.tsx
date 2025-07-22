import {translation, useTranslate} from "../src/translation";

translation.addTranslations({
    welcome: {
        en: "Welcome, {name}!",
        es: "¡Bienvenido, {name}!",
        fr: "Bienvenue, {name} !",
    },
    buttons: {
        en: {
            submit: "Submit",
            cancel: "Cancel",
        },
        es: {
            submit: "Enviar",
            cancel: "Cancelar",
        },
        fr: {
            submit: "Soumettre",
            cancel: "Annuler",
        },
    },
});

// In components
function WelcomeMessage({ name }: { name: string }) {
    const t = useTranslate();

    return (
        <div>
            <h1>{t('welcome', { name })}</h1>
            <button>{t('buttons.submit')}</button>
            <button>{t('buttons.cancel')}</button>

            <select
                value={translation.locale}
                onChange={(e) => translation.locale = e.target.value}
            >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
            </select>
        </div>
    );
}