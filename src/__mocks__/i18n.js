export const gettext = (day) => {
    const ES_DAYS = {
        'sunday': 'Domingo',
        'monday': 'Lunes',
        'tuesday': 'Martes',
        'wednesday': 'Miércoles',
        'thursday': 'Jueves',
        'friday': 'Viernes',
        'saturday': 'Sábado'
    };

    return ES_DAYS[day];
};
