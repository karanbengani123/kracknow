export interface IAddBundle {
    bundle_name: 'small_pack' | 'medium_pack' | 'large_pack' | 'extra_large';
    amount_coins: number;
    amount_rupees: number;
    status?: number; // Optional status field, defaults to 1 if not provided
}
