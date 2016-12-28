namespace CookiesCartCs
{
    internal class CartItem
    {
        public int Count { get; set; }
        public string Name { get; set; }
        public override string ToString()
        {
            return $"{Count} 个 {Name}";
        }
    }
}