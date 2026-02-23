from app.core.supabase_client import supabase

def get_summary():
    # Fetch all transactions
    data = supabase.table("transactions").select("*").execute().data

    total_earnings = sum(t["total"] or 0 for t in data)
    total_paid = sum(t["paid"] or 0 for t in data)
    total_balance = sum(t["balance"] or 0 for t in data)

    return {
        "total_transactions": len(data),
        "total_earnings": total_earnings,
        "total_paid": total_paid,
        "total_balance": total_balance,
        "profit": total_paid - total_balance
    }

def get_monthly_report():
    query = """
        select json_agg(t)
        from (
            select
                date_trunc('month', date) as month,
                sum(total) as total_earnings,
                sum(paid) as total_paid,
                sum(balance) as total_balance
            from transactions
            group by 1
            order by 1 asc
        ) t;
    """

    result = supabase.rpc("exec_sql", {"sql": query}).execute().data
    return result or []   # prevent null from breaking frontend


def get_employee_activity():
    query = """
        select json_agg(t)
        from (
            select
                u.raw_user_meta_data->>'full_name' as employee_name,
                t.user_id,
                count(*) as total_uploads,
                sum(t.total) as total_earnings,
                max(t.date) as last_upload
            from transactions t
            left join auth.users u on u.id = t.user_id
            group by t.user_id, u.raw_user_meta_data->>'full_name'
            order by total_uploads desc
        ) t;
    """

    result = supabase.rpc("exec_sql", {"sql": query}).execute().data
    return result or []


def get_top_stores():
    query = """
        select json_agg(t)
        from (
            select
                store_name,
                count(*) as transaction_count,
                sum(total) as total_spent
            from transactions
            group by store_name
            order by total_spent desc
            limit 10
        ) t;
    """

    result = supabase.rpc("exec_sql", {"sql": query}).execute().data
    return result or []