/**
 * Api model for /updates.json endpoint
 */

type Updates = {
    items?: Array<number>; // List of HN Item IDs.
    profiles?: Array<string>; // List of users identifiers.
};

export default Updates;
